import ComponentBase from './component-base';
import EventEmitterMixin from './event-emitter-mixin';

const defaultStateName = 'default';
const defaultStateData = {};

function ComponentEvents(options = {}) {
    // наследование
    ComponentBase.call(this, options);

    // примеси
    EventEmitterMixin.call(this, options.on);

    Object.defineProperty(this, '__stateName', {
        value: defaultStateName,
        writable: true,
        enumerable: false,
    });

    Object.defineProperty(this, '__stateData', {
        value: defaultStateData,
        writable: true,
        enumerable: false,
    });
}

// наследование
ComponentEvents.prototype = Object.create(ComponentBase.prototype);

// примеси
Object.assign(ComponentEvents.prototype, EventEmitterMixin.prototype);

// цепочка прототипов
Object.defineProperty(ComponentEvents.prototype, 'constructor', {
    value: ComponentEvents,
    writable: true,
    enumerable: false,
});

/**
 * Получение состояний
 * @return {Object} data Данные о состоянии
 */
ComponentEvents.prototype.getState = function() {
    return {
        name: this.__stateName,
        data: this.__stateData,
    };
}

/**
 * Передача состояний
 * @param {String} name Имя состояния
 * @param {Object} data Данные о состоянии
 */
ComponentEvents.prototype.setState = function(name, data) {
    if (typeof name == 'object' && typeof data == 'undefined') {
        data = name;
        name = defaultStateName;
    }

    this.__stateName = name;
    this.__stateData = data;

    this.emit(`state:${name}`, data);
}

/**
 * Обновление состояний
 * @param {Object} data Данные о состоянии
 */
ComponentEvents.prototype.updateState = function(data) {
    this.setState(this.__stateName, Object.assign({}, this.__stateData, data));
}

/**
 * Получение состояний
 * @param {Function} fn Функция - callback
 */
ComponentEvents.prototype.onState = function(name, fn) {
    if (typeof name == 'function' && typeof fn == 'undefined') {
        fn = name;
        name = defaultStateName;
    }

    this.on(`state:${name}`, fn);
}

export default ComponentEvents;
