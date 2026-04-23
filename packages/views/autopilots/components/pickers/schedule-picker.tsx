"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@multica/ui/components/ui/popover";
import {
  TriggerConfigSection,
  type TriggerConfig,
  type TriggerI18n,
} from "../trigger-config";
import { useLocale } from "@/features/dashboard/i18n";

export function SchedulePicker({
  config,
  onChange,
  triggerRender,
}: {
  config: TriggerConfig;
  onChange: (cfg: TriggerConfig) => void;
  triggerRender: React.ReactElement;
}) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const i18n = t.autopilots as unknown as TriggerI18n;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={triggerRender} />
      <PopoverContent align="start" className="w-96 p-3">
        <TriggerConfigSection config={config} onChange={onChange} i18n={i18n} />
      </PopoverContent>
    </Popover>
  );
}
