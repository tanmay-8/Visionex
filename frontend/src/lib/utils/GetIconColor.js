export default function GetIconColor() {
    if (
        !document.getElementById("mainCont").classList.contains("dark")
    ) {
        return "#374151";
    } else {
        return "#e5e7eb";
    }
}