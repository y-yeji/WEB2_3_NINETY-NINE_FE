import GitHubLogo from "../../assets/github-logo.svg";

const teamData = [
  {
    name: "FE",
    repoUrl:
      "https://github.com/prgrms-web-devcourse-final-project/WEB2_3_NINETY-NINE_FE",
    members: [
      { name: "왕정훈", github: "https://github.com/wjh1010" },
      { name: "이예지", github: "https://github.com/y-yeji" },
      { name: "정다윤", github: "https://github.com/dilma01" },
    ],
  },
  {
    name: "BE",
    repoUrl:
      "https://github.com/prgrms-web-devcourse-final-project/WEB2_3_NINETY-NINE_BE",
    members: [
      {
        name: "김태영",
        github:
          "https://github.com/taeyoung789?tab=overview&from=2025-03-01&to=2025-03-02",
      },
      { name: "범태현", github: "https://github.com/MadPumpkin3" },
      { name: "신정범", github: "https://github.com/ShinJeongBeom" },
      { name: "유현수", github: "https://github.com/Yu-Hyeon-Su" },
    ],
  },
];

const TeamIntroduce = () => (
  <article className="xm:w-[229px] md:w-[253px] xl:w-[230px] xl: body-small-r text-blue-1 xl:border-t xl:border-base-1">
    {teamData.map((team, index) => (
      <div
        key={team.name}
        className={`flex flex-col items-start ${index === 0 ? "mt-[32px] mb-[30px]" : "mb-[32px] md:mb-5"} px-4`}
      >
        <div className="flex items-center gap-2 mb-2">
          <a
            href={team.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mb-2"
          >
            <img
              className="w-[25px] h-[25px]"
              src={GitHubLogo}
              alt="깃허브로고"
            />
            <span>On culture_{team.name}</span>
          </a>
        </div>
        <ul className="flex flex-wrap gap-x-[17px] gap-y-2">
          {team.members.map((member) => (
            <li key={member.name}>
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                {member.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
    <p className="border-t border-base-1 pt-[15px] text-center">
      Team. NINETY-NINE
    </p>
  </article>
);

export default TeamIntroduce;
