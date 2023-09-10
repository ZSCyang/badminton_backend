import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { env } from "../shared/env";
import {
  ArcoResolver,
  IduxResolver,
  VantResolver,
  DevUiResolver,
  QuasarResolver,
  ViewUiResolver,
  InklineResolver,
  TDesignResolver,
  NaiveUiResolver,
  Vuetify3Resolver,
  VarletUIResolver,
  PrimeVueResolver,
  ElementPlusResolver,
  AntDesignVueResolver,
  VueUseComponentsResolver,
} from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";

export default function autoImport() {
  return [
    AutoImport({
      resolvers: [
        AntDesignVueResolver(),
        ElementPlusResolver(),

        IconsResolver({
          prefix: "i",
        }),
      ],
      // dirs: ['../../src/hooks'],
      imports: ["vue", "vue-router", "@vueuse/core", "vue-i18n", "pinia"],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: "src/auto-import.d.ts",
    }),
    Components({
      dts: "src/components.d.ts",
      dirs: ["src/components"],
      deep: true,
      directoryAsNamespace: true,
      resolvers: [
        ElementPlusResolver(),
        // Icon自动引入解析器
        IconsResolver({
          // 使用element-plus的图标库
          // 其他图标库请到 https://icon-sets.iconify.design/
          // 'ep', 'ic','mdi'
          enabledCollections: env.VITE_AIUTO_IMPORT_ICONS.split(","),
        }),
      ],
      extensions: ["vue", "tsx", "jsx"],
    }),
    Icons({
      autoInstall: true,
    }),
  ];
}
