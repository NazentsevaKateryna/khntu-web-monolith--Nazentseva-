# Лабораторна робота №1
**Тема:** Початкова архітектура проєкту, ER-діаграма сутностей та налаштування HTTP-сервера  
**Дисципліна:** Технологія розробки Інтернет-застосунків  
**Виконала:** Студентка групи 3ПР1, Назенцева Катерина

---

## Опис предметної області
Розглядається система електронної комерції (інтернет-магазин).
- Користувачі (`USER`) оформлюють замовлення (`ORDER`).
- Товари (`PRODUCT`) розподілені за категоріями (`CATEGORY`).
- Замовлення містить кілька товарів, а товар може входити в різні замовлення — зв'язок $N:M$ реалізовано через проміжну сутність `ORDER_ITEM`, яка фіксує кількість та ціну одиниці товару на момент покупки.

---

## ER-діаграма сутностей (Mermaid)

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    CATEGORY ||--o{ PRODUCT : contains
    ORDER ||--|{ ORDER_ITEM : includes
    PRODUCT ||--o{ ORDER_ITEM : referenced_in

    USER {
        int id PK
        string email
        string passwordHash
        string fullName
        string role
    }

    CATEGORY {
        int id PK
        string name
        string slug
    }

    PRODUCT {
        int id PK
        int categoryId FK
        string title
        text description
        float price
        int stock
    }

    ORDER {
        int id PK
        int userId FK
        string status
        float totalAmount
        string createdAt
    }

    ORDER_ITEM {
        int id PK
        int orderId FK
        int productId FK
        int quantity
        float unitPrice
    }
```
