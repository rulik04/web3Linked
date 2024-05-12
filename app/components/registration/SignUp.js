export default function SignUp() {
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="w-1/3">
            <h1 className="text-3xl font-bold text-center">Sign Up</h1>
            <form className="mt-5">
            <div className="flex flex-col gap-4">
                <input
                type="text"
                className="h-10 p-3 outline-none border rounded-md border-slate-200"
                placeholder="First Name"
                />
                <input
                type="text"
                className="h-10 p-3 outline-none border rounded-md border-slate-200"
                placeholder="Last Name"
                />
                <input
                type="email"
                className="h-10 p-3 outline-none border rounded-md border-slate-200"
                placeholder="Email"
                />
                <input
                type="password"
                className="h-10 p-3 outline-none border rounded-md border-slate-200"
                placeholder="Password"
                />
                <button
                type="submit"
                className="bg-blue-500 text-white font-semibold h-10 rounded-md"
                >
                Sign Up
                </button>
            </div>
            </form>
        </div>
        </div>
    )
    }