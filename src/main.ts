import { createApp } from "vue";
import "./styles/style.scss";
import "./styles/github-markdown.scss";
import "element-plus/theme-chalk/dark/css-vars.css";

import App from "./App.vue";

import router, { setupRouter } from "./router/index";
import plugins from "./plugins/index";
import { registerStore } from "./stores";
import pinia from "@/stores/store";
import { useUserStore } from "@/stores/useUser";

import directivePlugin from "@/directives/imgLayz";
import defaneDrag from "@/directives/drag";

async function bootstrap() {
  const app = createApp(App);
  app.use(pinia);
  app.use(plugins);
  // app.use(router);
  setupRouter(app);
  // registerStore();
  let jwt = (sessionStorage.getItem("user") as string) || "";
  if (jwt) {
    let token = null;
    try {
      token = JSON.parse(jwt).token;
    } catch (e) {
      console.log("%c The user's JWT is error", "color:red");
    }
    useUserStore().setUser({ role: [1, 2] });
  }

  await router.isReady();
  app.use(directivePlugin);
  app.use(defaneDrag);
  app.mount("#app");
}

// permission control
void bootstrap();
