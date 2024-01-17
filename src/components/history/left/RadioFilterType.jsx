import { Radio, List, ListItem, ListItemPrefix } from "@material-tailwind/react";

export default function RadioFilterType({ onChange }) {
    
    const handleTypeChange = (event) => {
        const selectedValue = event.target.value;
        onChange(selectedValue);
      };

  return (
    <div>
      <List>
      <ListItem className="p-0">
          <label
            htmlFor="radio-type-all"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                name="radio-type"
                id="radio-type-all"
                ripple={false}
                className="hover:before:opacity-0"
                value={"all"}
                onChange={handleTypeChange}
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <div className="font-medium text-black text-sm">
              All
            </div>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="radio-type-transfer"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                name="radio-type"
                id="radio-type-transfer"
                ripple={false}
                className="hover:before:opacity-0"
                value={0}
                onChange={handleTypeChange}
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <div className="font-medium text-black text-sm">
              Transfer Stok
            </div>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="radio-type-customer-order"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                name="radio-type"
                id="radio-type-customer-order"
                ripple={false}
                className="hover:before:opacity-0"
                value={1}
                onChange={handleTypeChange}
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <div className="font-medium text-black text-sm">
              Customer Order
            </div>
          </label>
        </ListItem>
      </List>
    </div>
  );
}
