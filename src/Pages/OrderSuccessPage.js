import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../data/supabaseClient';
import Stripe from 'stripe';
import '../styles/KeyboardsPage.css';
import { STRIPE_KEYS } from '../data/stripeKeys';

const stripeServer = new Stripe(STRIPE_KEYS[0].SECRET_KEY);

function OrderSuccessPage({ user }) {
    const [message, setMessage] = useState("Verifying your order...");
    const location = useLocation();
    const navigate = useNavigate();
    const processed = useRef(false);

    useEffect(() => {
        if (processed.current) {
            console.log("OrderSuccessPage: Already processed.");
            return;
        }

        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get('session_id');

        if (!sessionId) {
            setMessage("Error: Checkout session ID not found. Redirecting...");
            processed.current = true;
            setTimeout(() => navigate('/'), 3000);
            return;
        }

        const recordOrder = async () => {
            processed.current = true;
            setMessage("Retrieving order details from Stripe...");
            try {
                console.log("Retrieving session:", sessionId);
                const session = await stripeServer.checkout.sessions.retrieve(
                    sessionId,
                    { expand: ['line_items.data.price.product'] }
                );
                console.log("Retrieved Stripe session:", session);

                if (!session || session.payment_status !== 'paid') {
                    throw new Error(`Session not found or payment not marked as paid (Status: ${session?.payment_status}). Please contact support if payment was made.`);
                }

                const sessionUserId = session.metadata?.userId;

                if (!user || (sessionUserId && sessionUserId !== user.id)) {
                    console.warn("User inconsistency detected on success page. Session UserID:", sessionUserId, "Current UserID:", user?.id);
                    setMessage("Order verified (User check warning noted). Saving to history...");
                } else {
                     setMessage("Order verified. Saving to your history...");
                }

                const currentUserId = user?.id || sessionUserId;
                if (!currentUserId) {
                    throw new Error("Could not determine user ID for saving the order.");
                }

                const itemsFromSession = session.line_items?.data;

                if (!itemsFromSession || itemsFromSession.length === 0) {
                    throw new Error("No items found in the retrieved Stripe session details.");
                }

                // Prepare and Insert orders into Supabase
                const orderInsertPromises = itemsFromSession.map(item => {
                    if (!item?.price?.product?.name || !item?.quantity || !item?.price?.unit_amount) {
                        console.error("Skipping item due to missing data:", item);
                        return Promise.resolve({ error: { message: "Skipped item due to missing data" }, skipped: true });
                    }

                    const productNameWithColor = item.price.product.name;
                    const productName = productNameWithColor.substring(0, productNameWithColor.lastIndexOf('(')).trim();
                    const selectedColor = productNameWithColor.substring(productNameWithColor.lastIndexOf('(') + 1, productNameWithColor.lastIndexOf(')')).trim() || "N/A";

                    const quantity = item.quantity;
                    const price = item.price.unit_amount / 100;

                    console.log(`Preparing to insert: User ${currentUserId}, Product: ${productName}, Color: ${selectedColor}, Qty: ${quantity}, Price: ${price}`);

                    return supabase.from("orders").insert({
                        user_id: currentUserId,
                        product_name: productName,
                        selected_color: selectedColor,
                        quantity: quantity,
                        price: price,
                    });
                });

                const results = await Promise.all(orderInsertPromises);
                console.log("Supabase insert results:", results);

                const errors = results.filter(r => r && r.error && !r.skipped);

                if (errors.length > 0) {
                    console.error("Supabase insertion errors:", errors);
                    setMessage("Order successful, but failed to save some items to your order history. Please check your history later.");
                } else {
                    const skippedCount = results.filter(r => r && r.skipped).length;
                     if (skippedCount > 0) {
                         setMessage(`Order successful! ${itemsFromSession.length - skippedCount} items saved to your history. (${skippedCount} items skipped due to data issues).`);
                     } else {
                         setMessage("Order successful! Your items have been saved to your order history.");
                     }
                }

            } catch (error) {
                console.error("Failed to process order:", error);
                setMessage(`Error processing order: ${error.message}. Please contact support if payment was completed.`);
            }
        };

        recordOrder();

        return () => {
            console.log("OrderSuccessPage cleanup.");
        };

    }, [location, user, navigate]);

    return (
        <div className="cart-section" style={{ margin: '40px auto', padding: '30px', maxWidth: '600px', textAlign: 'center', backgroundColor: 'white', color: 'black' }}>
            <h2>Order Confirmation</h2>
            <p style={{ margin: '20px 0', fontSize: '1.1em' }}>{message}</p>
            <Link to="/" className="checkout-button" style={{ display: 'inline-block', textDecoration: 'none' }}>
                Continue Shopping
            </Link>
        </div>
    );
}

export default OrderSuccessPage;