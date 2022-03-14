#coding=utf-8
import sys
import pk.pyautogui as pyautogui
import pk.pyperclip as pyperclip
pyautogui.PAUSE = 1  # 暂停的时间
pyautogui.FAILSAFE = True  # 自启动故障处理
pyperclip.copy(sys.argv[1])  # 先复制
pyautogui.hotkey('ctrl', 'v')  # 再粘贴
pyautogui.keyDown('enter')  # 按下回车键
pyautogui.keyUp('enter')  # 释放回车键
