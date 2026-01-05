import DashboardHeader from "../components/DashboardHeader";
import Footer from "../components/Footer/Footer";

const Orders = () => {
    return (
        <>
            <DashboardHeader />

            <div className="container my-5">
                <h2 className="mb-4">Orders</h2>

                <div
                    className="bg-light rounded d-flex flex-column justify-content-center align-items-center"
                    style={{ minHeight: "220px" }}
                >
                    <h6>No orders yet</h6>
                    <p className="text-muted mb-0">
                        Go to store to place an order.
                    </p>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Orders;


