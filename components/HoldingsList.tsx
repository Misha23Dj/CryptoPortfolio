import ErrorBanner from "@/components/ErrorBanner";
import HoldingRow from "@/components/HoldingRow";
import PortfolioHeader from "@/components/PortfolioHeader";
import SkeletonRow from "@/components/SkeletonRow";

import { useTheme } from "@/theme/ThemeProvider";
import { LegendList } from "@legendapp/list";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Scenario } from "./utils/getPortfolio";
import { SortMode, sortRows } from "./utils/sortRows";
import { usePortfolioQuery } from "./utils/usePortfolioQuery";

const HoldingsList: React.FC<{ testID?: string }> = ({ testID }) => {
  const theme = useTheme();
  const [scenario] = useState<Scenario>("random");
  const [sortMode] = useState<SortMode>("value");

  const { data, isLoading, isRefetching, error, refetch } =
    usePortfolioQuery(scenario);
  const refreshing = isLoading || isRefetching;
  const rows = useMemo(
    () => (data ? sortRows(data.rows, sortMode) : []),
    [data, sortMode]
  );
  console.log(data);
  return (
    <View testID={testID} style={{ flex: 1 }}>
      {error ? (
        <ErrorBanner
          message={error instanceof Error ? error.message : "Error"}
        />
      ) : null}
      <LegendList
        data={rows}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <HoldingRow item={item} />}
        ListHeaderComponent={<PortfolioHeader scenario={scenario} />}
        refreshing={refreshing}
        onRefresh={refetch}
        extraData={data?.lastUpdatedText}
        contentContainerStyle={{ paddingBottom: 24, backgroundColor: theme.bg }}
        ListEmptyComponent={
          refreshing ? (
            <View>
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={`sk-${i}`} />
              ))}
              <ActivityIndicator style={{ marginTop: 16 }} />
            </View>
          ) : undefined
        }
      />
    </View>
  );
};

export default HoldingsList;
