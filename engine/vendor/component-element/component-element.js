import ComponentBase from './component-base';
import ComponentEvents from './component-events';

const getObjectConstructorName = object => Object.getPrototypeOf(object).constructor.name;

// сохранение экземпляра объекта в элемент
const setInstance = function($element, object) {
    const instanceName = `__${getObjectConstructorName(object)}`;
    const instanceObj  = $element[instanceName];

    if (instanceObj instanceof ComponentBase) {
        instanceObj.destroy();
    }

    delete $element[instanceName];

    Object.defineProperty($element, instanceName, {
        value: object,
        writable: true,
        enumerable: false,
        configurable: true,
    });
}

function ComponentElement($element, options = {}) {
    setInstance($element, this);

    this.$element = $element;

    // наследование
    ComponentEvents.call(this, options);

    Object.defineProperty(this, '__listeners', {
        value: [],
        writable: true,
        enumerable: false,
    });
}

// наследование
ComponentElement.prototype = Object.create(ComponentEvents.prototype);

// цепочка прототипов
Object.defineProperty(ComponentElement.prototype, 'constructor', {
    value: ComponentElement,
    writable: true,
    enumerable: false,
});

/**
 * Установка обработчика событий на элемент
 * @param {Element}  $element Элемент
 * @param {String}   name     Имя события
 * @param {Function} fn       Функция обработчик
 */
ComponentElement.prototype.addEventListener = function($element, name, fn) {
    $element.addEventListener(name, fn);
    this.__listeners.push({$element, name, fn});
}

/**
 * Удаление компонента
 */
ComponentElement.prototype.destroy = function() {
    this.__listeners.forEach(({$element, name, fn}) => {
        $element.removeEventListener(name, fn);
    });

    ComponentEvents.prototype.destroy.call(this);
}

export default ComponentElement;
