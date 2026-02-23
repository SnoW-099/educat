import json

# --- 1. CARGA INICIAL ---
try:
    with open("inventario.json", "r") as recover:
        items = json.load(recover)
        print("✅ Inventario cargado correctamente.")
except:
    items = {
        "papel": 10,
        "miel": 25,
        "leche": 5
    }
    print("⚠️ No se encontró archivo, usando inventario por defecto.")

# --- 2. ASISTENTE DE GUARDADO (El "retoque") ---
def guardar_datos():
    """Esta función centraliza el guardado para no repetir código."""
    with open("inventario.json", "w") as autoguardado:
        json.dump(items, autoguardado)
    print("💾 Autoguardado ejecutado.")

# --- 3. FUNCIONES DE HERRAMIENTAS ---
def agregar_item(nombre_producto, precio):
    items[nombre_producto] = precio 
    guardar_datos() # Llamamos al asistente
    print(f"➕ {nombre_producto} añadido.")


def borrar_producto(nombre_producto):
    if nombre_producto in items:
        del items[nombre_producto]
        guardar_datos() # Llamamos al asistente
        print(f"❌ {nombre_producto} eliminado.")
    else:
        print(f"❓ El producto {nombre_producto} no existe.")

def encontrar_producto(nombre_producto):
    if nombre_producto in items:
        print(f"🔍 {nombre_producto} encontrado: {items[nombre_producto]}$")
    else:
        print(f"❓ El producto {nombre_producto} no existe.")


def aplicar_oferta():
    for k in items:
        if items[k] > 10:
            items[k] = items[k] / 2
    guardar_datos() # Llamamos al asistente
    print("📉 Ofertas aplicadas.")


while True:
    print("\n--- Menú ---")
    print("\n1. Agregar item")
    print("\n2. Borrar item")
    print("\n3. salir")
    print("\n4. aplicar oferta")
    print("\n5. inventario actual")
    print("\n6. encontrar productos")

    choice = (input("\nElije la opcion deseada: "))

    if choice == "1":
    # --- 3. FUNCIONES DE HERRAMIENTAS ---
        try:
            nmb = input("\nNombre del producto: ")
            prc = float(input("Precio del producto: "))
            agregar_item(nmb, prc)

        except ValueError:
            print("⚠️ Precio inválido, por favor ingresa un número.")
        
    elif choice == "2":
        nmb = input("\nNombre del producto a eliminar: ")
        borrar_producto(nmb)

    elif choice == "3":
        print("\n Gracias por usar nuestro servicios, hasta la proxima!")
        break

    elif choice == "4":
        # Mostramos estado actual
        aplicar_oferta()

    elif choice == "5":
     print("\n" + "—"*25)
     print("📋 ESTADO DEL ALMACÉN")
     print("—"*25)
     for producto, precio in items.items():
         print(f"{producto.capitalize():<10} | {precio:>6.2f}$")

    elif choice == "6":
        nmb = input("\nNombre del producto a encontrar: ")
        encontrar_producto(nmb)
        
    else:
        print("\n⚠️ Opción no válida, intenta de nuevo.")