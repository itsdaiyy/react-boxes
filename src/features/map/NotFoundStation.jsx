import notFoundStationPng from "@/assets/notFoundStation.png";

export default function NotFoundStation() {
    return (
        <div className="flex justify-center items-center flex-col gap-[24px]">
            <img alt="logo" src={notFoundStationPng} className="h-[100px]"></img>
            <p>查無站點，請換個關鍵字再搜尋看看唷</p>
        </div>
    )
}