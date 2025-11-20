import Github_Button from "@/components/github_button";
import Main_Hero_Section from "@/components/main_hero_section";
import Link from "next/link";
import Youtube_Button from "@/components/youtube_button";
import Homepage_Cards from "@/components/homepage_cards";
import { news } from "./card_info";
import WhatsNewSection from "@/components/whats_new_section";

export default function Home() {

  return (
    <div>
      <Main_Hero_Section />

      <WhatsNewSection />

      <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5">
        <Link href={"https://github.com/Theolin-Nadasen"}>
          <Github_Button />
        </Link>

        <Youtube_Button />
      </div>

      <div className="flex flex-col justify-center items-center gap-10 my-5">
        {news.map((article) => {
          return ( <Homepage_Cards key={article.title} title={article.title} description={article.description} link={article.link} /> )
        })}
      </div>

    </div>
  );
}
