import Github_Button from "@/components/github_button";
import Main_Hero_Section from "@/components/main_hero_section";
import Link from "next/link";
import Youtube_Button from "@/components/youtube_button";

export default function Home() {

  return (
    <div>
      <Main_Hero_Section />

      <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5">
        <Link href={"https://github.com/Theolin-Nadasen"}>
          <Github_Button />
        </Link>

        <Youtube_Button />
      </div>

    </div>
  );
}
