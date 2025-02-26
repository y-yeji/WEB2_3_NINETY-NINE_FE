import { AllHTMLAttributes, useEffect, useRef } from "react";

interface ScriptProps extends AllHTMLAttributes<HTMLScriptElement> {
  onLoad?: () => void;
}

function Script({ onLoad, ...props }: ScriptProps) {
  const ref = useRef<HTMLScriptElement>(null);

  useEffect(() => {
    const script = ref.current;
    if (script) {
      script.onload = onLoad ? () => onLoad() : null;
    }

    return () => {
      if (script) {
        script.onload = null;
      }
    };
  }, [onLoad]);

  return <script async ref={ref} {...props} />;
}

export default Script;
