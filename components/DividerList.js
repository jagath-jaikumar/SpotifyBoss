import React from "react";
import { Divider, List, ListItem } from "@ui-kitten/components";

export const DividerList = ({ data }) => {
  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
    />
  );

  return (
    <List
      data={data}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};
