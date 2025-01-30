"use client";
import { useState } from "react";

const Home = () => {
    const [selected, setSelected] = useState("none");
    const [resetPasswordHover, setResetPasswordHover] = useState(false);

    return (
        <main className="w-full h-screen flex flex-col text-center justify-center items-center">
            <input
                className="bg-bgcolor w-52 border border-ovteal text-white px-2"
                placeholder="Username"
                type="text"
            />
            <select
                className="bg-bgcolor w-52 border border-ovteal text-white px-2 py-1 mt-4"
                title="Ban/Unban"
            >
                <option value="nothing">Ban/Unban</option>
                <option value="ban">Ban</option>
                <option value="unban">Unban</option>
            </select>
            <div className="flex items-center mt-4">
                <button
                    onClick={() => setSelected("plus")}
                    className={`px-1 py-1 ${selected === "plus" ? "text-ovteal font-bold" : "text-neutral-500"}`}
                >
                    +
                </button>
                <button
                    onClick={() => setSelected("minus")}
                    className={`px-1 py-1 ${selected === "minus" ? "text-ovteal font-bold" : "text-neutral-500"}`}
                >
                    -
                </button>

                <input
                    className="bg-bgcolor w-52 border border-ovteal text-white px-2 mr-8"
                    placeholder="$OVA"
                    type="number"
                />
            </div>
            <select
                className="bg-bgcolor w-52 border border-ovteal text-white px-2 py-1 mt-4"
                title="Select Badge"
            >
                <option value="nothing">Select Badge</option>
                <option value="badge1">Badge 1</option>
                <option value="badge2">Badge 2</option>
                <option value="badge3">Badge 3</option>
                <option value="badge4">Badge 4</option>
                <option value="badge5">Badge 5</option>
                <option value="badge6">Badge 6</option>
                <option value="badge7">Badge 7</option>
                <option value="badge8">Badge 8</option>
                <option value="badge9">Badge 9</option>
                <option value="badge10">Badge 10</option>
                <option value="badge11">Badge 11</option>
                <option value="badge12">Badge 12</option>
                <option value="badge13">Badge 13</option>
                <option value="badge14">Badge 14</option>
                <option value="badge15">Badge 15</option>
                <option value="badge16">Badge 16</option>
                <option value="badge17">Badge 17</option>
                <option value="badge18">Badge 18</option>
                <option value="badge19">Badge 19</option>
                <option value="badge20">Badge 20</option>
            </select>
            <input
                className="bg-bgcolor w-52 border border-ovteal text-white px-2 mt-4"
                placeholder="Change Username"
                type="text"
            />
            <button
                onClick={() => setResetPasswordHover(!resetPasswordHover)}
                className={`bg-bgcolor w-52 border border-ovteal text-white mt-4 ${resetPasswordHover ? "bg-white/10" : ""}`}
            >
                Reset Password
            </button>
            <button className="bg-bgcolor w-52 border border-ovteal text-white mt-4 hover:bg-white/10">
                Confirm
            </button>
        </main>
    );
};

export default Home;
