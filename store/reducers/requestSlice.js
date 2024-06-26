import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../env";
import {
  addListProductForTT,
  changeAcceptInvoiceTA,
  changeAmountExpenses,
  changeListProductForTT,
  changeTemporaryData,
  clearDataInputsInv,
  clearLogin,
  removeListProductForTT,
} from "./stateSlice";
import { changeToken } from "./saveDataSlice";
import { Alert } from "react-native";

/// logInAccount
export const logInAccount = createAsyncThunk(
  "logInAccount",
  async function (info, { dispatch, rejectWithValue }) {
    const { login, password, navigation } = info;
    dispatch(changePreloader(true));
    setTimeout(() => {
      dispatch(changeToken(login));
      navigation.navigate("Main");
      dispatch(changePreloader(false));
      dispatch(clearLogin());
    }, 500);
    try {
      const response = await axios({
        method: "POST",
        url: ``,
        data: {
          login,
          password,
        },
      });
      if (response.status >= 200 && response.status < 300) {
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getBalance
/// для получения баланса
export const getBalance = createAsyncThunk(
  "getBalance",
  async function (agent_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_debt?agent_guid=${agent_guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.debt;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getMyInvoice
/// для получения всех накладных, которые одобрил админ (invoice_status=1)
export const getMyInvoice = createAsyncThunk(
  "getMyInvoice",
  async function (agent_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_invoices?agent_guid=${agent_guid}&invoice_status=1`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getAcceptInvoice
////// принятые ТА накладные (для истории)
export const getAcceptInvoice = createAsyncThunk(
  "getAcceptInvoice",
  /// для получения всех накладных, которые одобрил админ (invoice_status=2)
  async function (agent_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_invoices?agent_guid=${agent_guid}&invoice_status=2`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getAcceptProdInvoice
////// принятые ТА список товаров (история)
export const getAcceptProdInvoice = createAsyncThunk(
  "getAcceptProdInvoice",
  /// для получения всех накладных, которые одобрил админ (invoice_status=2)
  async function (guidInvoice, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_invoice?invoice_guid=${guidInvoice}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.[0]?.list;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getMyEveryInvoice
export const getMyEveryInvoice = createAsyncThunk(
  "getMyEveryInvoice",
  /// для получения каждой накладной
  async function (guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_invoice?invoice_guid=${guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        const data = response?.data?.[0];
        console.log(data?.list, "sadas");
        dispatch(
          //// зап0лняю state для таблицы остатков
          changeAcceptInvoiceTA({
            invoice_guid: data?.guid,
            products: data?.list?.map((i) => {
              return {
                guid: i?.guid,
                is_checked: false,
                change: i?.count_usushka,
                product_price: i?.product_price,
              };
            }),
          })
        );
        return data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// acceptInvoiceTA
export const acceptInvoiceTA = createAsyncThunk(
  "acceptInvoiceTA",
  /// для принятия накладной торговым агентом
  async function ({ data, navigation }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/ta/agent_conf_inv`,
        data,
      });
      if (response.status >= 200 && response.status < 300) {
        navigation.navigate("Main");
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// createInvoiceTA
export const createInvoiceTA = createAsyncThunk(
  "createInvoiceTA",
  /// создание накладной Торговым агентом
  async function ({ data, navigation }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/ta/create_invoice`,
        data,
      });
      if (response.status >= 200 && response.status < 300) {
        setTimeout(() => {
          navigation.navigate("everyInvoice", {
            codeid: response?.data?.codeid,
            guid: response?.data?.guid, /// guid накладной
            seller_guid: data?.seller_guid, /// seller_guid точки(магазина)
          });
        }, 200);
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getAllSellersPoint
export const getAllSellersPoint = createAsyncThunk(
  "getAllSellersPoint",
  /// для получения списка ревизоров
  async function (guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_points?agent_guid=${guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        // console.log(response?.data, "444");
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getCategoryTA
export const getCategoryTA = createAsyncThunk(
  "getCategoryTA",
  /// для получения списка точек (магазинов)
  async function (agent_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_category?agent_guid=${agent_guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getProductTA
export const getProductTA = createAsyncThunk(
  "getProductTA",
  /// для получения списка точек (магазинов)
  async function ({ guid, agent_guid }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_product?categ_guid=${guid}&agent_guid=${agent_guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// checkAddProductLeftovers
/// проверяю продукт на его кол-во, если кол-во есть,
/// то добавляю в список , а если не , то выводится alert
export const checkAddProductLeftovers = createAsyncThunk(
  "checkAddProductLeftovers",
  async function ({ data, getData }, { dispatch, rejectWithValue }) {
    const { productGuid, count, product_price, guidInvoice } = data;
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/ta/create_check_product`,
        data: {
          product_guid: productGuid,
          count,
          price: product_price,
          invoice_guid: guidInvoice,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const check = response?.data?.result; /// 1 - успешный,2 - кол-во не совпадает, 0 - неуспешный
        if (+check === 1) {
          getData();
          dispatch(addListProductForTT(data));
          dispatch(clearDataInputsInv());
          dispatch(changeTemporaryData({}));
          // Alert.alert("Товар добавлен в накладную");
        } else if (+check === 2) {
          Alert.alert(
            "Ошибка!",
            "Введенное количество товара больше доступного количества. Пожалуйста, введите корректное количество."
          );
        } else {
          Alert.alert("Упс, что-то пошло не так!");
        }
        dispatch(changePreloader(false));
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// deleteProInInvoice
export const deleteProInInvoice = createAsyncThunk(
  "deleteProInInvoice",
  /// удаляю продукт со списка
  async function ({ product_guid, obj }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/ta/del_product`,
        data: { product_guid },
      });
      if (response.status >= 200 && response.status < 300) {
        dispatch(removeListProductForTT(obj));
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// sendProdInvoiceTT
export const sendProdInvoiceTT = createAsyncThunk(
  "sendProdInvoiceTT",
  /// Отправка список накладной с товарами для ТТ от ТА
  async function ({ guid, navigation }, { dispatch, rejectWithValue }) {
    // console.log(guid, "guid");
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/ta/confirm_invoice`,
        data: { invoice_guid: guid },
      });

      if (response.status >= 200 && response.status < 300) {
        dispatch(changeListProductForTT([])); /// очищаю список , где лежат данные для отправки ТТ
        dispatch(changeAmountExpenses("")); /// очищаю input для суммы трат денег ТТ
        navigation.navigate("Main");
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getMyLeftovers
export const getMyLeftovers = createAsyncThunk(
  "getMyLeftovers",
  async function (guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_report_leftovers?agent_guid=${guid}`, /// тут есть еще search и category
      });
      if (response.status >= 200 && response.status < 300) {
        // console.log(response?.data, "response?.data");
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getInvoiceEveryTA
/// список накладных каждого ТА(типо истории)
export const getInvoiceEveryTA = createAsyncThunk(
  "getInvoiceEveryTA",
  async function (guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_agent_invoice?agent_guid=${guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        // console.log(response?.data,"response?.data");
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getProductEveryInvoice
/// список товаров каждой накладной ТА(типо истории)
export const getProductEveryInvoice = createAsyncThunk(
  "getProductEveryInvoice",
  async function (guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_agent__invoice_product?invoice_guid=${guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        // console.log(response?.data?.[0]?.list, "response?.data");
        dispatch(changeListProductForTT(response?.data?.[0]?.list));
        return response?.data?.[0]?.list;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getListExpenses
/// список накладных каждого ТА(типо истории)
export const getListExpenses = createAsyncThunk(
  "getListExpenses",
  async function (guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_point_expenses?point_guid=${guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        // console.log(response?.data,"response?.data");
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// acceptMoney
/// прнятие денег у ТТ (принимает ТА)
export const acceptMoney = createAsyncThunk(
  "acceptMoney",
  async function ({ data, closeModal }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/ta/point_oplata`,
        data,
      });
      if (response.status >= 200 && response.status < 300) {
        closeModal();
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getHistoryReturn
/// просмотр возврата товара у ТА
export const getHistoryReturn = createAsyncThunk(
  "getHistoryReturn",
  async function (agent_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_invoice_return?agent_guid=${agent_guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getAllAdmins
/// список всех админов
export const getAllAdmins = createAsyncThunk(
  "getAllAdmins",
  async function (i, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GEt",
        url: `${API}/ta/get_operator`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// createInvoiceReturnTA
/// Создания накладной для возврата товара
export const createInvoiceReturnTA = createAsyncThunk(
  "createInvoiceReturnTA",
  async function (info, { dispatch, rejectWithValue }) {
    const { data, navigation, closeModal } = info;
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/ta/create_invoice_return`,
        data,
      });
      if (response.status >= 200 && response.status < 300) {
        const { guid } = response?.data;
        closeModal();
        navigation?.navigate("ReturnProd", { invoice_guid: guid });
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// returnListProduct
/// список для возврата товара
export const returnListProduct = createAsyncThunk(
  "returnListProduct",
  async function ({ data, navigation }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/ta/create_invoice_return_products`,
        data,
      });
      if (response.status >= 200 && response.status < 300) {
        navigation.navigate("Main");
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getReturnHistory
/// история списка возврата товароов
export const getReturnHistory = createAsyncThunk(
  "getReturnHistory",
  async function (invoice_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_invoice_return_product?invoice_guid=${invoice_guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        // navigation.navigate("Main");
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  preloader: false,
  chech: "",
  balance: 0,
  listMyInvoice: [], /// список накладных , но не принятых ТА
  listAcceptInvoice: [], /// список накладных , принятых ТА (история)
  listAcceptInvoiceProd: [], /// список накладных , принятых ТА (история)
  everyInvoice: {},
  listSellersPoints: [],
  listCategoryTA: [], //  список категорий ТА
  listProductTA: [], //  список продуктов ТА (cписок прод-тов отсортированные селектами)
  listLeftovers: [], // список остатков(переделанный мною)
  listInvoiceEveryTA: [], /// список накладных каждого ТА(типо истории)
  listProductEveryInvoiceTA: [], /// список товаров каждой накладной ТА(типо истории)
  listExpenses: [], /// список затрат(трат) у ТТ

  ///return
  listHistoryReturn: [], //// ист0рия возврата
  listLeftoversForReturn: [], // список остатков(переделанный мною)
  listAdmins: [], //// список админов
  listProdReturn: [], //// список возвращенных товаров админу от ТА
};

const requestSlice = createSlice({
  name: "requestSlice",
  initialState,
  extraReducers: (builder) => {
    //// logInAccount
    builder.addCase(logInAccount.fulfilled, (state, action) => {
      state.preloader = false;
      state.chech = action.payload;
    });
    builder.addCase(logInAccount.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(logInAccount.pending, (state, action) => {
      state.preloader = true;
    });

    ///// getBalance
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.preloader = false;
      state.balance = action.payload;
    });
    builder.addCase(getBalance.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getBalance.pending, (state, action) => {
      state.preloader = true;
    });

    //// getMyInvoice
    builder.addCase(getMyInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listMyInvoice = action.payload;
    });
    builder.addCase(getMyInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getMyInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    //// getAcceptInvoice
    builder.addCase(getAcceptInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listAcceptInvoice = action.payload;
    });
    builder.addCase(getAcceptInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getAcceptInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    ///// getAcceptProdInvoice
    builder.addCase(getAcceptProdInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listAcceptInvoiceProd = action.payload;
    });
    builder.addCase(getAcceptProdInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getAcceptProdInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    //// getMyEveryInvoice
    builder.addCase(getMyEveryInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.everyInvoice = action.payload;
    });
    builder.addCase(getMyEveryInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getMyEveryInvoice.pending, (state, action) => {
      state.preloader = true;
    });
    ///// acceptInvoiceTA
    builder.addCase(acceptInvoiceTA.fulfilled, (state, action) => {
      state.preloader = false;
      // Alert.alert("Принято!");
    });
    builder.addCase(acceptInvoiceTA.rejected, (state, action) => {
      state.error = action.payload;
      Alert.alert("Упс, что-то пошло не так!");
      state.preloader = false;
    });
    builder.addCase(acceptInvoiceTA.pending, (state, action) => {
      state.preloader = true;
    });
    ///// getAllSellersPoint
    builder.addCase(getAllSellersPoint.fulfilled, (state, action) => {
      state.preloader = false;
      state.listSellersPoints = action.payload?.map(
        ({ name, seller_guid, seller_fio, debt }) => ({
          label: `${name}, ${seller_fio}`,
          value: seller_guid,
          debit: debt,
        })
      );
    });
    /// [ { label: "Колбаса ", value: "********************************" },]
    builder.addCase(getAllSellersPoint.rejected, (state, action) => {
      state.error = action.payload;
      Alert.alert("Упс, что-то пошло не так!");
      state.preloader = false;
    });
    builder.addCase(getAllSellersPoint.pending, (state, action) => {
      state.preloader = true;
    });
    //// createInvoiceTA
    builder.addCase(createInvoiceTA.fulfilled, (state, action) => {
      state.preloader = false;
      // Alert.alert("Успешно создано!");
    });
    builder.addCase(createInvoiceTA.rejected, (state, action) => {
      state.error = action.payload;
      Alert.alert("Упс, что-то пошло не так! Не удалось создать накладную");
      state.preloader = false;
    });
    builder.addCase(createInvoiceTA.pending, (state, action) => {
      state.preloader = true;
    });
    /////// getCategoryTA
    builder.addCase(getCategoryTA.fulfilled, (state, action) => {
      state.preloader = false;
      state.listCategoryTA = action?.payload?.map(
        ({ category_name, category_guid }, ind) => ({
          label: `${ind + 2}. ${category_name}`,
          value: category_guid,
        })
      );
      // Добавляем категорию "Все" в начало массива
      state.listCategoryTA.unshift({
        label: "1. Все",
        value: "0", // Здесь может быть уникальное значение для категории "Все"
      });
    });
    builder.addCase(getCategoryTA.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getCategoryTA.pending, (state, action) => {
      state.preloader = true;
    });
    ////// getProductTA
    builder.addCase(getProductTA.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProductTA = action.payload;
    });
    builder.addCase(getProductTA.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getProductTA.pending, (state, action) => {
      state.preloader = true;
    });
    //////// sendProdInvoiceTT
    builder.addCase(sendProdInvoiceTT.fulfilled, (state, action) => {
      state.preloader = false;
      // Alert.alert("Товар был успешно передан!");
    });
    builder.addCase(sendProdInvoiceTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось передать товар");
    });
    builder.addCase(sendProdInvoiceTT.pending, (state, action) => {
      state.preloader = true;
    });
    //////// getMyLeftovers
    builder.addCase(getMyLeftovers.fulfilled, (state, action) => {
      state.preloader = false;
      state.listLeftovers = action.payload?.map((item, ind) => [
        `${ind + 1}. ${item.product_name}`,
        `${item.start_outcome}`,
        `${item.income}`,
        `${item.outcome}`,
        `${item.end_outcome}`,
      ]);
      state.listLeftoversForReturn = action.payload;
    });
    builder.addCase(getMyLeftovers.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getMyLeftovers.pending, (state, action) => {
      state.preloader = true;
    });
    ////// getInvoiceEveryTA
    builder.addCase(getInvoiceEveryTA.fulfilled, (state, action) => {
      state.preloader = false;
      state.listInvoiceEveryTA = action.payload;
    });
    builder.addCase(getInvoiceEveryTA.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getInvoiceEveryTA.pending, (state, action) => {
      state.preloader = true;
    });
    ////// getProductEveryInvoice
    builder.addCase(getProductEveryInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProductEveryInvoiceTA = action.payload;
    });
    builder.addCase(getProductEveryInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getProductEveryInvoice.pending, (state, action) => {
      state.preloader = true;
    });
    ////// checkAddProductLeftovers
    builder.addCase(checkAddProductLeftovers.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(checkAddProductLeftovers.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      // Alert.alert("Упс, что-то пошло не так! Повторите попытку позже ...  ");
    });
    builder.addCase(checkAddProductLeftovers.pending, (state, action) => {
      state.preloader = true;
    });
    ////// getListExpenses
    builder.addCase(getListExpenses.fulfilled, (state, action) => {
      state.preloader = false;
      state.listExpenses = action.payload;
    });
    builder.addCase(getListExpenses.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getListExpenses.pending, (state, action) => {
      state.preloader = true;
    });
    ////// acceptMoney
    builder.addCase(acceptMoney.fulfilled, (state, action) => {
      state.preloader = false;
      // Alert.alert("Оплата успешно принята");
    });
    builder.addCase(acceptMoney.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось принять оплату");
    });
    builder.addCase(acceptMoney.pending, (state, action) => {
      state.preloader = true;
      state.listHistoryReturn = action.payload;
    });
    //////// getHistoryReturn
    builder.addCase(getHistoryReturn.fulfilled, (state, action) => {
      state.preloader = false;
      state.listHistoryReturn = action.payload;
    });
    builder.addCase(getHistoryReturn.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getHistoryReturn.pending, (state, action) => {
      state.preloader = true;
    });

    //////// getAllAdmins
    builder.addCase(getAllAdmins.fulfilled, (state, action) => {
      state.preloader = false;
      state.listAdmins = action.payload;
    });
    builder.addCase(getAllAdmins.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getAllAdmins.pending, (state, action) => {
      state.preloader = true;
    });

    ///////// createInvoiceReturnTA
    builder.addCase(createInvoiceReturnTA.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(createInvoiceReturnTA.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось создать накладную");
    });
    builder.addCase(createInvoiceReturnTA.pending, (state, action) => {
      state.preloader = true;
    });

    /////////// returnListProduct
    builder.addCase(returnListProduct.fulfilled, (state, action) => {
      state.preloader = false;
      // Alert.alert("Накладная для возврата товара успешно создана!");
    });
    builder.addCase(returnListProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert(
        "Упс, что-то пошло не так! Не удалось cформировать накладную для возврата товара"
      );
    });
    builder.addCase(returnListProduct.pending, (state, action) => {
      state.preloader = true;
    });

    //////////// getReturnHistory
    builder.addCase(getReturnHistory.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProdReturn = action.payload?.[0]?.list;
    });
    builder.addCase(getReturnHistory.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getReturnHistory.pending, (state, action) => {
      state.preloader = true;
    });
  },

  reducers: {
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
    changeListInvoices: (state, action) => {
      state.listMyInvoice = action.payload;
    },
    changeLeftovers: (state, action) => {
      state.listLeftovers = action.payload;
    },
    changeListSellersPoints: (state, action) => {
      state.listSellersPoints = action.payload;
    },
  },
});
export const {
  changePreloader,
  changeListInvoices,
  changeLeftovers,
  changeListSellersPoints,
} = requestSlice.actions;

export default requestSlice.reducer;
