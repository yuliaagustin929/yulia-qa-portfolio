import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

class LeadFormSeleniumTest(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless=new")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.implicitly_wait(10)
        self.wait = WebDriverWait(self.driver, 10)

    def test_navigation_and_form_visibility(self):
        driver = self.driver
        driver.get("https://the-internet.herokuapp.com/login")

        # Assert Page Title
        self.assertIn("The Internet", driver.title)

        # Locate elements by ID and Name
        username_field = self.wait.until(EC.visibility_of_element_located((By.ID, "username")))
        password_field = driver.find_element(By.ID, "password")
        login_btn = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")

        # Enter credentials
        username_field.send_keys("tomsmith")
        password_field.send_keys("SuperSecretPassword!")
        login_btn.click()

        # Verify flash message
        flash_message = self.wait.until(EC.visibility_of_element_located((By.ID, "flash")))
        self.assertIn("You logged into a secure area!", flash_message.text)

    def tearDown(self):
        if self.driver:
            self.driver.quit()

if __name__ == "__main__":
    unittest.main()
