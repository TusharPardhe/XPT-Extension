import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Modal } from "semantic-ui-react";
import { ApiCall } from "../../../../utils/api.util";

import "./airdropPaymentModal.scss";

const AirdropPaymentModal = ({ closeModal, state, setState }) => {
    const { openPaymentModal, paymentImgUrl, listingFees } = state;

    useEffect(() => {
        if (openPaymentModal) {
            callXummAPIForQR();
        }
    }, [openPaymentModal]);

    const createWebSocketConnection = (data) => {
        const ws = new WebSocket(data.data.refs.websocket_status);

        ws.onmessage = async function (event) {
            const json = JSON.parse(event.data);
            try {
                if (json.payload_uuidv4) {
                    const payload = {
                        method: "GET",
                        url: "user/validate/uuid",
                        params: {
                            uuid: json.payload_uuidv4,
                        },
                    };
                    const response = await ApiCall(payload);
                    if (response.data.signed) {
                        setState({ paymentSuccess: true });
                    } else {
                        toast.error("You've cancelled the payment. Please try again.", { autoClose: 2000 });
                        setState({ paymentSuccess: false, openPaymentModal: false, paymentError: ["You've cancelled the payment. Please try again."], });
                    }
                    ws.close();
                }
            } catch (err) {
                console.log(err);
                toast.error("Uh Oh! An error occurred. Please try again.", { autoClose: 2000 });
                setState({ paymentSuccess: false, openPaymentModal: false, paymentError: ["Uh Oh! An error occurred. Please try again."] });
                ws.close();
            }
        };
    };

    const callXummAPIForQR = async () => {
        try {
            const payload = {
                method: "POST",
                url: "user/xumm/transaction",
                encrypt: false,
                auth: false,
                data: {
                    txJSON: {
                        "TransactionType": "Payment",
                        "Destination": process.env.DONATION_ADDRESS,
                        "Amount": (listingFees * 1000000).toString(),
                    },
                },
            };
            const response = await ApiCall(payload);
            setState({ paymentImgUrl: response.data.refs.qr_png });
            createWebSocketConnection(response);
        } catch (err) {
            console.log(err);
            toast.error("Uh Oh! An error occurred. Please try again.", { autoClose: 2000 });
            setState({ paymentImgUrl: "", paymentSuccess: false, openPaymentModal: false });
        }
    };


    return (
        <Modal size="mini" open={openPaymentModal} onClose={closeModal} className="paymentModal">
            <Modal.Header className="modal_header">Pay with XUMM</Modal.Header>
            <Modal.Content className="modal_content">
                <img src={paymentImgUrl} alt="payWithXumm" />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default AirdropPaymentModal;
