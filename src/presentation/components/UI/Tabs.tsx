import styles from "./Tabs.module.scss";

export interface TabItem {
  key: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

export default function Tabs({ items, activeKey, onChange, className }: TabsProps) {
  return (
    <div className={[styles.tabs, className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={[styles.tab, item.key === activeKey && styles.on].filter(Boolean).join(" ")}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
