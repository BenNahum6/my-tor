import React from "react";
import MainBord from "@/app/components/dashboard/panel/MainBord";
import Bar from "@/app/components/dashboard/panel/Bar";

export default function HomeScreen() {
    return (
        <div className="App">
            <Bar />
            <MainBord />
        </div>
    );
}

