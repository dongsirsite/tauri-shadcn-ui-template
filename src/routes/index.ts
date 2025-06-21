import App from "@/page/App";
import Home from "@/page/Home";
import TaskPage from "@/page/tasks/TaskPage";
import commInfo from "@/page/comm_info/commInfo";
import commInfo1 from "@/page/tasks1/commInfo";
import commInfo2 from "@/page/tasks2/commInfo";
import commInfo3 from "@/page/tasks3/commInfo";
import commInfo4 from "@/page/tasks4/commInfo";
import Layout from "@/Layout";
import React from "react";
import { createBrowserRouter, type RouteObject } from "react-router";
import { navMainMenu } from "@/components/app-sidebar";

// 定义路由配置项的类型
interface RouteConfig {
  path?: string;
  index?: boolean;
  component: keyof typeof componentMap;
  children?: RouteConfig[];
}

// 定义组件映射对象
const componentMap = {
  Layout,
  Home,
  App,
  TaskPage,
  commInfo,
  commInfo1,
  commInfo2,
  commInfo3,
  commInfo4,
};

// 提取函数用于根据 URL 映射组件名称
const getComponentName = (url: string): keyof typeof componentMap => {
  if (url === "/app") return "App";
  return "Home";
};

// 过滤掉 url 为 '#' 的菜单项，并转换为 RouteConfig 对象
const menuRoutes = navMainMenu
  .filter((item) => item.url !== "#")
  .map((item) => ({
    path: item.url.replace(/^\//, ""), // 移除开头的 '/'
    component: getComponentName(item.url),
  }));

export const routesConfig: RouteConfig[] = [
  {
    path: "/",
    component: "Layout",
    children: [
      {
        // path: "home",
        index: true,
        component: "Home",
      },
      // 合并原有的 children 和从 menu 生成的路由
      ...menuRoutes,
      {
        path: "task",
        component: "TaskPage",
      },
      {
        path: "commInfo",
        component: "commInfo",
      },
      {
        path: "commInfo1",
        component: "commInfo1",
      },
      {
        path: "commInfo2",
        component: "commInfo2",
      },
      {
        path: "commInfo3",
        component: "commInfo3",
      },
      {
        path: "commInfo4",
        component: "commInfo4",
      },
    ],
  },
];

// 转换 JSON 配置为路由配置对象的函数
const convertJsonToRoutes = (jsonConfig: RouteConfig[]): RouteObject[] => {
  return jsonConfig.map((config): RouteObject => {
    const baseRoute: RouteObject = {
      index: config.index,
      element: React.createElement(componentMap[config.component]),
    };

    if (config.path === "home") {
      baseRoute.index = true;
    } else {
      baseRoute.path = config.path;
    }

    if (config.children) {
      baseRoute.children = convertJsonToRoutes(config.children);
    }

    return baseRoute;
  });
};

// 将 JSON 配置转换为路由配置
const routeConfig = convertJsonToRoutes(routesConfig);

// 通过配置对象生成 router
export const router = createBrowserRouter(routeConfig);
