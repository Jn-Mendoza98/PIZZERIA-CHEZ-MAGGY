from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("console", lambda msg: print(f"Browser console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Browser error: {err}"))

        page.goto("file:///app/menu.html")
        page.wait_for_timeout(1000)

        # Add item
        page.evaluate("cartApp.addItem('Pizza', 20.0, 'img.png')")
        page.wait_for_timeout(500)

        # Open cart
        page.evaluate("cartApp.toggleModal()")
        page.wait_for_timeout(500)

        # Click remove
        page.locator(".fa-trash-alt").click()
        page.wait_for_timeout(500)

        # Check items
        items = page.evaluate("cartApp.state.items")
        print(f"Items in cart: {items}")

        browser.close()

if __name__ == "__main__":
    run()
