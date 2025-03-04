import { Link, LinkProps } from "expo-router";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends LinkProps {}

const ThemedLink = ({ style, ...props }: Props) => {
  const primary = useThemeColor({}, "primary");

  return <Link style={[{ color: primary }, style]} {...props} />;
};

export default ThemedLink;
