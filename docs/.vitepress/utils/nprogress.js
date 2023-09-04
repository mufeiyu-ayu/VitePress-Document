//  进度条
import NProgress from "nprogress";
import { useRouter } from "vitepress";

const beforeNprogress = () => {
  NProgress.start();
};

const afterNprogress = () => {
  NProgress.done();
};

export default function () {
  const router = useRouter();
  router.onBeforeRouteChange = beforeNprogress;
  router.onAfterRouteChanged = afterNprogress;
}
