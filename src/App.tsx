import "./App.css";
import { Icon } from "@iconify/react";
import iconPaths from "./iconPaths";
import { useState } from "react";

type Branch = {
  name: string;
  icon?: string;
  children?: Branch[];
};

const files: Branch = {
  name: "root",
  icon: "root",
  children: [
    {
      name: "node_modules/",
      children: [{ name: "Index.ts" }],
    },
    {
      name: "src/",
      children: [
        {
          name: "controller/",
          children: [
            {
              name: "config/",
              children: [{ name: "app/" }],
            },
            {
              name: "app/",
              children: [
                { name: "Main.ts" },
                { name: "Config.html" },
                { name: "App.ts" },
              ],
            },
            {
              name: "utils/",
              children: [{ name: "App.css" }],
            },
          ],
        },
        {
          name: "utils/",
          children: [{ name: "Index.json" }],
        },
        { name: "Controller.json" },
      ],
    },
  ],
};

const assignIcon = (name: string): string => {
  if (name.endsWith("/")) return "vscode-icons:default-folder";
  const ext = name.split(".").pop() || "";
  return iconPaths[ext] || "vscode-icons:file";
};

function Entry(props: Branch) {
  const { name, icon, children } = props;
  const hasChildren = !!children;
  const iconParsed =
    icon || (hasChildren ? "material-symbols:folder" : assignIcon(name));

  const [isOpen, setIsOpen] = useState(true);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`branch__node open select-none`}>
      <div
        className="branch__body flex items-center gap-2 my-[3px] cursor-pointer group"
        onClick={handleClick}
      >
        <Icon icon={iconParsed} className="relative top-1" />
        <p>{name.split("/")[0]}</p>
        {hasChildren && (
          <Icon
            icon="mdi:chevron-down"
            className="relative top-1.5 -left-2 opacity-0 group-hover:opacity-100 transition-opacity branch__chevron"
          />
        )}
      </div>
      {isOpen && (
        <div className="branch__child pl-4">
          {children?.map((entry, idx) => (
            <Entry {...entry} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <div className="fixed h-8 w-full bg-[#344344] inset-0"></div>
      <div className=" border-white border-1 p-4 border-r-[#777] border-b-[#777] fixed top-8 left-0">
        {files.children?.map((entry, idx) => (
          <Entry {...entry} key={idx} />
        ))}
      </div>
    </>
  );
}

export default App;
