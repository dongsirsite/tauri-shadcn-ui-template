import App from "@/page/App";
import Home from "@/page/Home";
import TaskPage from "@/page/tasks/TaskPage";
import commInfo from "@/page/comm_info/commInfo";
import commInfo1  from "@/page/tasks1/commInfo";
import commInfo2  from "@/page/tasks2/commInfo";
import commInfo3  from "@/page/tasks3/commInfo";
import commInfo4  from "@/page/tasks4/commInfo";
import Layout from "@/Layout";
import React from 'react';
import { createBrowserRouter,type RouteObject } from "react-router";

// 定义路由配置项的类型
interface RouteConfig {
  path: string;
  component: keyof typeof componentMap;
  children?: RouteConfig[];
}

export const routesConfig: RouteConfig[] = [
  {
    path: "/",
    component: "Layout",
    children: [
      {
        path: "home",
        component: "Home",
      },
      {
        path: "app",
        component: "App",
      },
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

// 转换 JSON 配置为路由配置对象的函数
function convertJsonToRoutes(jsonConfig: RouteConfig[]): RouteObject[] {
  return jsonConfig.map((config): RouteObject => {
    const route: RouteObject = {
      path: config.path,
      element: React.createElement(componentMap[config.component]),
    };

    if (config.children) {
      route.children = convertJsonToRoutes(config.children);
    }

    return route;
  });
}

// 将 JSON 配置转换为路由配置
const routeConfig = convertJsonToRoutes(routesConfig);

// 通过配置对象生成 router
export const router = createBrowserRouter(routeConfig);
