import React from "react";
import { Divider, List, ListItem, Layout } from "@ui-kitten/components";

export const DividerList = ({ data }) => {
  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.name} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
    />
  );

  return (
    <Layout level="1">
      <List
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </Layout>
  );
};
