import Main_Hero_Section from "@/components/main_hero_section";
import Link from "next/link";
import Homepage_Cards from "@/components/homepage_cards";
import { news } from "./card_info";
import WhatsNewSection from "@/components/whats_new_section";

export default function Home() {

  return (
    <div className="min-h-screen pb-20">
      <Main_Hero_Section />

      <div className="space-y-20">
        <WhatsNewSection />

        <div className="flex flex-col justify-center items-center gap-12 my-10 px-4">
          {news.map((article) => {
            return (<Homepage_Cards key={article.title} title={article.title} description={article.description} link={article.link} />)
          })}
        </div>
      </div>

    </div>
  );
}
