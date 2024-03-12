import { Center, Flex, Text } from "@mantine/core";
import { NavLink } from "react-router-dom";

type Link = {
  isActive: boolean;
  isPending: boolean;
};

const NavLinks = () => {
  return (
    <Center py={20}>
      <Flex gap={20}>
        <NavLink
          to="/"
          className={({ isActive, isPending }: Link) =>
            isPending
              ? "pending"
              : isActive
              ? "text-green-500"
              : "text-gray-400"
          }
        >
          <Text>HOME</Text>
        </NavLink>
      </Flex>
    </Center>
  );
};

export default NavLinks;
