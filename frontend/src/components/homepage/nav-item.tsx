import Image from "next/image";
import DropdownMenu from "@/components/homepage/dropdown-menu";
import LeftDrawer from "@/components/homepage/mobile-nav-drawer";
export default async function NavItem() {
    const navItems = ["網站", "說明", "理念"];
    const inner_text = [["架設目的","開發日誌"],["理念","公司理念"],["網站","網站地圖"]];
    const inner_link = [["/goal","/log"],["#","#"],["#","#"]]
    return (
        <div className="bg-white w-[1700px] h-[90%] rounded-[3rem]  items-center flex flex-row mr-[2%] justify-between">
            <a className="w-[200px] flex m-[2%]" href="/">
                <Image src="/header_icon.png" alt="logo" width={150} height={40} priority={true}
                       className="rounded-full w-[200px] h-auto"/>
            </a>
            <div className="ml-[30%] invisible hidden xl:visible xl:basis-2/5 xl:flex xl:flex-row">
                <DropdownMenu navItems={navItems} inner_text={inner_text} inner_link={inner_link}/>
            </div>
            {/* mobile導覽列按鈕 */}
            <LeftDrawer navItems={navItems} inner_link={inner_link} inner_text={inner_text}/>
        </div>
    )
}