const isProd = import.meta.env.PROD;

export const API_URL = isProd
  ? "https://jammin-api-cppe.onrender.com/api"
  : "http://localhost:1337/api";

export const API_TOKEN = isProd
  ? "aeca31a06c36cfc27be331c07f4b23c3396a8bf68e6570789c6149a56b7cb0cac28b4428011ffc8b0e662972d90b0cca484daa28b58f97ba7f2bbcf4bbec0fa675221bdeb542ce3828b119f33b1953a69ac15486b317bfc1e3ceeb081e283d77ec320bf540ec29dd3f87ec5caa0098d6eebc32d633bce3d36edd3125778326d0"
  : "7834536fa351bf748aa14fdea07408a42f90c74db3c0a848df75fc21f89b8906eacfad4021fdd334078eb0a9a75387ed1840a51cc17efc6892a781e7448d105110048cf9b14f20e5c11faa758300748d75fa6b79af72718a869fb65c50a35472bf7783823abe83ca84594b02707c82d0f2f45f482028b6340b183d6a07a772f5";

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];