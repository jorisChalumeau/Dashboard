package com.foo.web;
import com.foo.domain.Timer;
import org.springframework.roo.addon.web.mvc.controller.annotations.ControllerType;
import org.springframework.roo.addon.web.mvc.controller.annotations.RooController;
import org.springframework.roo.addon.web.mvc.thymeleaf.annotations.RooThymeleaf;

/**
 * = TimersItemThymeleafController
 *
 * TODO Auto-generated class documentation
 *
 */
@RooController(entity = Timer.class, type = ControllerType.ITEM)
@RooThymeleaf
public class TimersItemThymeleafController {
}
