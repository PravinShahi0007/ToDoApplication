
function InjectGetAndSet(key, value) {
    if (key == "Lino") {
        var catchVal = value;   //parseInt(value);
        Object.defineProperty(this, key, {
            get: function () {
                return catchVal;
            },
            set: function (newValue) {
                if (newValue != catchVal) {
                    catchVal = newValue;
                    this.PropertyChanged.raise(this,
                {
                    PropertyName: key,
                    Value: newValue
                });
                }
            },
            enumerable: true,
            configurable: true
        });
    }
    if (key == "TrnUnit") {
        var catchVal = value;   //parseInt(value);
        Object.defineProperty(this, key, {
            get: function () {
                return catchVal;
            },
            set: function (newValue) {
                if (newValue != catchVal) {
                    catchVal = newValue;
                    this.PropertyChanged.raise(this,
                {
                    PropertyName: key,
                    Value: newValue
                });
                }
            },
            enumerable: true,
            configurable: true
        });
    }
    if (key == "TrnUnitKy") {
        var catchVal = value;   //parseInt(value);
        Object.defineProperty(this, key, {
            get: function () {
                return catchVal;
            },
            set: function (newValue) {
                if (newValue != catchVal) {
                    catchVal = newValue;
                    this.PropertyChanged.raise(this,
                {
                    PropertyName: key,
                    Value: newValue
                });
                }
            },
            enumerable: true,
            configurable: true
        });
    }
    if (key == "Rate") {
        var catchVal = parseFloat(value).toFixed(2);   //parseInt(value); parseFloat(yourString).toFixed(2)
        Object.defineProperty(this, key, {
            get: function () {
                return catchVal;
            },
            set: function (newValue) {
                if (newValue != catchVal) {
                    catchVal = newValue;
                    this.PropertyChanged.raise(this,
                {
                    PropertyName: key,
                    Value: newValue
                });
                }
            },
            enumerable: true,
            configurable: true
        });
    }
    if (key == "RateWMrkUp") {
        var catchVal = parseFloat(value).toFixed(2);   //parseInt(value);
        Object.defineProperty(this, key, {
            get: function () {
                return catchVal;
            },
            set: function (newValue) {
                if (newValue != catchVal) {
                    catchVal = newValue;
                    this.PropertyChanged.raise(this,
                {
                    PropertyName: key,
                    Value: newValue
                });
                }
            },
            enumerable: true,
            configurable: true
        });
    }
    if (key == "PrcsID") {
        var catchVal = value;   //parseInt(value);
        Object.defineProperty(this, key, {
            get: function () {
                return catchVal;
            },
            set: function (newValue) {
                if (newValue != catchVal) {
                    catchVal = newValue;
                    this.PropertyChanged.raise(this,
                {
                    PropertyName: key,
                    Value: newValue
                });
                }
            },
            enumerable: true,
            configurable: true
        });
    }
    if (key == "Qty") {
        var catchVal = parseFloat(value).toFixed(3);
        Object.defineProperty(this, key, {
            get: function () {
                return catchVal;
            },
            set: function (newValue) {
                if (newValue != catchVal) {
                    catchVal = newValue;

                    this.PropertyChanged.raise(this,
                {
                    PropertyName: key,
                    Value: newValue
                });
                }
            },
            enumerable: true,
            configurable: true
        });
    }
    if (key == "DlyPrgrsQtyThisSch") {
        var catchVal = parseFloat(value).toFixed(3);
        Object.defineProperty(this, key, {
            get: function () {
                return catchVal;
            },
            set: function (newValue) {
                if (newValue != catchVal) {
                    catchVal = newValue;

                    this.PropertyChanged.raise(this,
                {
                    PropertyName: key,
                    Value: newValue
                });
                }
            },
            enumerable: true,
            configurable: true
        });
    } if (key == "TTLDlyPrgrsQty") {
        var catchVal = parseFloat(value).toFixed(3);
        Object.defineProperty(this, key, {
            get: function () {
                return catchVal;
            },
            set: function (newValue) {
                if (newValue != catchVal) {
                    catchVal = newValue;

                    this.PropertyChanged.raise(this,
                {
                    PropertyName: key,
                    Value: newValue
                });
                }
            },
            enumerable: true,
            configurable: true
        });
    }
}