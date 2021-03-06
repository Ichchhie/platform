References in YAML configuration:
================================

It's possible to use static method call, service method call and class constant access in YAML datagrid configuration.
These references will be called by SystemAwareResolver while building datagrid in datagrid manager.

References types:
-----------------

Service call
-----------------
```
@oro_email.grid.query_builder->getChoicesQuery
```
Call method getChoicesQuery with datagrid name and YAML configuration key as arguments from oro_email.grid.query_builder service.

Static method call
------------------
```
Acme\Bundle\DemoBundle\SomeClass::testStaticCall
```
Class name can be defined in container's parameters or specified directly.

Constant
--------
```
Acme\Bundle\DemoBundle\SomeClass::TEST
```
PHP is_callable used to determine if it's callable or should be treated as constant.

If it's not callable and no constant exists with such name in the class, value became unchanged.

Service injection
-----------------
```
some_key: @some.serviceID
```
