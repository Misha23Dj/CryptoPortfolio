import { LegendList } from "@legendapp/list";
import React from "react";
import { View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import HeaderKPIs from "./HeaderKPIs";
import HoldingRow from "./HoldingRow";

type Item = {
  id: string;
  symbol: string;
  name: string;
  price?: number;
  chg24?: number;
  qty?: number;
  pl?: number;
  plPct?: number;
};

const HoldingsList = ({ data }: { data: Item[] }) => {
  const theme = useTheme();
  return (
    <View testID="holdings-list">
      <LegendList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <HoldingRow item={item} />}
        ListHeaderComponent={() => <HeaderKPIs />}
        ListHeaderComponentStyle={{}}
        contentContainerStyle={{ paddingBottom: 24, backgroundColor: theme.bg }}
      />
    </View>
  );
};

export default HoldingsList;
