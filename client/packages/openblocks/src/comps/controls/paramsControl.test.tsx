import { changeChildAction } from "openblocks-core";
import { evalAndReduce } from "comps/utils";
import { ParamsStringControl } from "./paramsControl";
import _ from "lodash";

test("test params control", () => {
  const content = "xx{{1+2+x}}sd{{-1}}";
  let comp = new ParamsStringControl({ value: content });
  comp = evalAndReduce(comp);
  expect(comp.toJsonValue()).toEqual(content);
  expect(_.mapValues(comp.getView(), (v) => v({ x: 4 }))).toEqual({ "-1": -1, "1+2+x": 7 });
  const content2 = "{{3+2}}";
  comp = comp.reduce(changeChildAction("text", "{{3+2}}"));
  comp = evalAndReduce(comp);
  expect(comp.toJsonValue()).toEqual(content2);
  expect(_.mapValues(comp.getView(), (v) => v())).toEqual({ "3+2": 5 });
});
