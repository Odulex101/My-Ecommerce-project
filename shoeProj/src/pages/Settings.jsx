import DashboardHeader from "../components/DashboardHeader";

const Settings = () => {
    return (
        <>
            <DashboardHeader />

            <div className="container my-5">
                <h3>Settings</h3>
                <p className="text-muted">
                    Account preferences and security settings will appear here.
                </p>
            </div>
        </>
    );
};

export default Settings;


