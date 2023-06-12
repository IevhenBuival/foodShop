import { Container } from "react-bootstrap";
import styles from "./PagesStyles.module.css";

interface IPageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: IPageContainerProps) => {
  return (
    <div className={`${styles.PageContainer} row flex-fill mh-0"`}>
      {children}
    </div>
  );
};

export default PageContainer;
