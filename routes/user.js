const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");