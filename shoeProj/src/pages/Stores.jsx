import React from "react";
import Footer from "../components/Footer/Footer";

const Stores = () => {
    return (
        <>
            <div className="container mt-5 mb-5">

                <h3 className="fw-bold">STORES</h3>
                <p>Find us in these fine stores:</p>

                <hr />

                <div className="row mt-4">

                    {/* Store 1 */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold">LAGOS</h5>
                        <p>No 4 Adigboluja Street<br />
                            Ikeja, 100271<br />
                            Phone: +2348068140632
                        </p>

                        <p>
                            Mon–Sat: 10:00am–7:00pm<br />
                            Sunday: Closed
                        </p>
                    </div>

                    {/* Store 2 */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold">ONDO</h5>
                        <p>No 4 Ikunehin Street<br />
                            Ondo State, 350108 <br />
                            Phone: +2348071344173
                        </p>

                        <p>
                            Mon–Fri: 9:00am–6:00pm<br />
                            Sat–Sun: 10:00am–5:00pm
                        </p>
                    </div>

                    {/* Store 3 */}
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold">City Center</h5>
                        <p>500 Terry Francine Street<br />
                            San Francisco, CA 94158<br />
                            Phone: 123.456.7890
                        </p>

                        <p>
                            Mon–Sat: 10:00am–7:00pm<br />
                            Sunday: Closed
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default Stores;
