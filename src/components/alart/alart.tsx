import {component$, Fragment, Slot} from "@builder.io/qwik";
import {HiXCircleOutline} from "@qwikest/icons/heroicons";

export const AlertError = component$(() => {
    return <div class="rounded-md bg-red-50 dark:bg-red-900/25 p-4">
        <div class="flex">
            <div class="flex-shrink-0">
                <HiXCircleOutline class="h-5 w-5 text-red-400 dark:text-red-500" aria-hidden="true" />
            </div>
            <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800 dark:text-red-400">
                    <Slot name={"title"} />
                </h3>
                <div class="mt-2 text-sm text-red-700 dark:text-red-500">
                    <ul role="list" class="list-disc space-y-1 pl-5">
                        <Slot />
                    </ul>
                </div>
            </div>
        </div>
    </div>
})
