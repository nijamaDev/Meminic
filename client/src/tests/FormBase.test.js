import React from "react";
import FormBase from "../components/FormBase/FormBase";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import updateProductIcon from "../assets/update_user.svg";
import { UpdateProductItems } from "../components/ProductUpdateSection/UpdateProductItems";
import { UpdateAvailableItem } from "../components/ProductUpdateSection/UpdateAvailableItem";

test("Renders content", () => {
  const user = { email: "melissa.gonzalez@gmail.com" };

  const view = render(
    <FormBase
      obj={user}
      img={updateProductIcon}
      formId="UpdateProduct"
      title="Modificar informacion"
      buttonName="Actualizar"
      itemsInput={UpdateProductItems}
      itemsSelect={UpdateAvailableItem}
    />
  );
  expect(view.container).toHaveTextContent(
    "Identificador",
    "Referencia",
    "Nombre",
    "Proveedor"
  );
});

test("No render content", () => {
  const user = { email: "melissa.gonzalez@gmail.com" };

  const view = render(
    <FormBase
      obj={user}
      img={updateProductIcon}
      formId="UpdateProduct"
      title="Modificar informacion"
      buttonName="Actualizar"
      itemsSelect={UpdateAvailableItem}
    />
  );
  expect(view.container).toHaveTextContent(
    "Identificador",
    "Referencia",
    "Nombre",
    "Proveedor"
  );
});

test("Render content selects", () => {
  const user = { email: "melissa.gonzalez@gmail.com" };

  const view = render(
    <FormBase
      obj={user}
      img={updateProductIcon}
      formId="UpdateProduct"
      title="Modificar informacion"
      buttonName="Actualizar"
      itemsInput={UpdateProductItems}
      itemsSelect={UpdateAvailableItem}
    />
  );

  expect(view.container).toHaveTextContent("Disponible", "No disponible");
});

test("No render content select", () => {
  const user = { email: "melissa.gonzalez@gmail.com" };

  const view = render(
    <FormBase
      obj={user}
      img={updateProductIcon}
      formId="UpdateProduct"
      title="Modificar informacion"
      buttonName="Actualizar"
    />
  );
  expect(view.container).toHaveTextContent("Disponible", "No disponible");
});
