import LoginForm from "../components/dashboard/Login";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">התחברות לבעל העסק</h1>
            <LoginForm />
        </div>
    );
}
