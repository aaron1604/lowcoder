import { Layout, SiderProps } from "antd";
import { TopHeaderHeight } from "constants/style";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Sider = styled(Layout.Sider)`
  height: calc(100vh - ${TopHeaderHeight});
  background: #f9f9fa;
  padding: 0 24px 0 24px;
  + main.ant-layout-content.main-content .react-grid-layout {
    background-color: #fff;
    min-height: 100vh;
  }
  .ant-menu {
    background: transparent;
    .ant-menu-item-selected {
      background-color: #eef0f3 !important;
    }

    .ant-menu-item {
      border-radius: 8px;
      &:hover {
        background: #eef0f3;
      }
    }
  }
`;

const Navbar = styled('div')`
  padding: 10px 0;
  .indicator {
    float: right;
  }
  .sidebar-item {
     > div {
      padding: 10px;
      :hover {
        background: #efeff1;
      }
     }
    font-weight: 600;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
    &.active-tab {
      color: #4965f2;
      a {
        color: #4965f2;
      }
      background: #ebf0f7;
    }
    a {
      padding: 10px;
      display: block;
      width: 100%;
      color: #2a2a2a;
      :hover {
        background: #efeff1;
      }
    }
    ul {
      padding-left: 10px;
    }
    .sidebar-item {
      border-bottom: 0;
    }
`;

const menuData = [
  {
    "id": 1,
    "title": "Apps",
    "icon": "https://img.icons8.com/?size=512&id=1349&format=png",
    "children": [{
      "id": 2,
      "title": "All Apps",
      "icon": "https://img.icons8.com/?size=512&id=53382&format=png",
      "route": "/apps",
      "children": []
    },{
      "id": 3,
      "title": "Modules",
      "icon": "https://img.icons8.com/?size=512&id=1349&format=png",
      //"route": "/apps/module",
      "children": [{
        "id": 4,
        "title": "All Modules",
        "icon": "https://img.icons8.com/?size=512&id=1349&format=png",
        "route": "/apps/module",
        "children": []
      },]
    },{
      "id": 5,
      "title": "Trash",
      "icon": "https://img.icons8.com/?size=512&id=7837&format=png",
      "route": "/trash",
      "children": []
    },]
  },
  {
    "id": 6,
    "title": "Admin Apps",
    "icon": "https://img.icons8.com/?size=512&id=1349&format=png",
    "children": [
      {
        "id": 7,
        "title": "App 1",
        "route": "/adminapp/64bf88a1e3417328c6af468f/admin",
        "children": []
      },
      {
        "id": 8,
        "title": "Laptop",
        "children": []
      }
    ]
  },
  {
    "id": 9,
    "title": "About Us",
    "icon": "https://img.icons8.com/?size=512&id=1349&format=png",
    "children": []
  }
]

interface MenuItem {
  id: number;
  title: string;
  icon?: string;
  children: MenuItem[];
  route?: string;
}

interface SidebarItemProps {
  item: MenuItem;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const location = useLocation();
  const checkChildActive = item.children.length > 0 && item.children.find((a) => a.route === location.pathname);
  const [isExpanded, setIsExpanded] = useState(checkChildActive? true : false);
  const hasChildren = item.children.length > 0;
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const isItemActive = item.route && location.pathname === item.route;

  return (
    <div className={isItemActive ? "sidebar-item active-tab" : "sidebar-item"}>
      {/* {item.route ?<Link to={item.route ?? ""}>{item.icon && <img style={{marginRight: '5px'}} src={item.icon} width={15} /> }
      {item.title}</Link>: <div>{item.icon && <img  style={{marginRight: '5px'}} src={item.icon} width={15} /> }
      {item.title}</div> } {<span>{isExpanded ? '▼' : '▶'}</span>} */}
      {hasChildren ? (
        <div onClick={handleToggle}>
          {item.icon && <img style={{marginRight: '5px'}} src={item.icon} width={15} /> }
          <span>{item.title}</span>
          <span className="indicator">{isExpanded ? '▼' : '▶'}</span>
        </div>
      ) : 
        ( <>
          {item.route ? 
            <Link to={item.route ?? ""}>
              {item.icon && <img style={{marginRight: '5px'}} src={item.icon} width={15} /> }
              {item.title}
            </Link>: 
            <div>{item.icon && <img style={{marginRight: '5px'}} src={item.icon} width={15} /> } {item.title}</div>}
          </>
          )}
      {hasChildren  && isExpanded && (
        <ul>
          {item.children.map((child) => (
            <SidebarItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default function SideBar(props: SiderProps) {
  const { children, ...otherProps } = props;
  return (
    <Sider theme="light" width={244} {...otherProps}>
      {/* {props.children} */}
      <Navbar>
        {menuData.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </Navbar>
    </Sider>
  );
}
