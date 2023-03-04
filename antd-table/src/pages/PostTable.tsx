import React, { useState, useEffect } from "react";
import { Button, Card, Space, Table } from "antd";
const { Column } = Table;

function PostTable(props: { tableData: any }): JSX.Element {
  const [filteredData, setFilteredData] = useState(props.tableData);
  const [filters, setFilters] = useState();

  useEffect(() => {
    setFilteredData(props.tableData);
  }, [props.tableData]);

  useEffect(() => {}, [filters]);

  type postData = typeof props.tableData;
  type DataType = typeof props.tableData;
  type ColumnFilter = {
    text: string | string[];
    value: string;
  };

  const createFilterArray = (
    dataSource: DataType[],
    property: string
  ): ColumnFilter[] => {
    const uniqueValues = Array.from(
      new Set(
        dataSource.map((item) => {
          const value = item[property];
          if (value === undefined) {
            return "";
          } else {
            return Array.isArray(value) ? value.join(",").trim() : value;
          }
        })
      )
    );

    let filterArray: any[] = [];

    filterArray = uniqueValues.map((value) => {
      if (value === undefined) {
        return { text: "-", value: "-" };
      } else {
        const newValue = value;

        return { text: newValue, value: newValue };
      }
    });

    return filterArray;
  };

  const emptyToHyphen = (element: any) => {
    if (
      element === "" ||
      element === undefined ||
      element === null ||
      element === " " ||
      /^\s*$/.test(element)
    ) {
      return "-";
    } else {
      return element;
    }
  };

  const concatValue = (value: any) => {
    if (typeof value === "string") {
      return emptyToHyphen(value);
    } else if (typeof value === "number") {
      return value;
    } else if (
      Array.isArray(value) &&
      value.every((item) => typeof item === "string")
    ) {
      return value.join(",");
    } else {
      return "-";
    }
  };

  const filterFun = (value: any, record: any, dataIndex: any) => {
    if (record) {
      const selectedValue = concatValue(record[dataIndex]);

      return selectedValue === value ? true : false;
    } else {
      return false;
    }
  };
  console.log("filteredData");
  console.log(filteredData);
  return (
    <Card title="Search Results">
      <Table
        dataSource={props.tableData}
        sticky
        scroll={{ x: 1000 }}
        onChange={(pagination: any, filters: any, sorter: any, extra: any) => {
          console.log("pagination");
          console.log(pagination);
          console.log("filters");
          console.log(filters);
          console.log("sorter");
          console.log(sorter);
          console.log("extra");
          console.log(extra);
          setFilteredData(extra.currentDataSource);
          setFilters(filters);
        }}
      >
        <Column
          title="ID"
          key="id"
          render={(text: string, record: postData, index: number) => (
            <Space size="middle">{record.id}</Space>
          )}
        />
        <Column
          title="Tags"
          key="tags"
          render={(text: any, record: postData, index: number) => {
            return <Space size="middle">{record.tags}</Space>;
          }}
          filters={createFilterArray(filteredData, "tags")}
          onFilter={(value: any, record: postData) => {
            return filterFun(value, record, "tags");
          }}
        />
        <Column
          title="Reactions"
          key="reactions"
          render={(text: string, record: postData, index: number) => (
            <Space size="middle">{record.reactions}</Space>
          )}
          filters={createFilterArray(filteredData, "reactions")}
          onFilter={(value: any, record: postData) => {
            return filterFun(value, record, "reactions");
          }}
        />
        <Column
          title="Title"
          key="title"
          render={(text: string, record: postData, index: number) => (
            <Space size="middle">{record.title}</Space>
          )}
        />
      </Table>
    </Card>
  );
}

export default PostTable;
