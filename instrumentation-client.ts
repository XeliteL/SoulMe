import { dispatchNavigationStart } from "@/shared/ui/Preloader/lib/navigationStart"

export function onRouterTransitionStart(url: string) {
  dispatchNavigationStart(url)
}
