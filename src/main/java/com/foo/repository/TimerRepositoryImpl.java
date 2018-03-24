package com.foo.repository;

import io.springlets.data.jpa.repository.support.QueryDslRepositorySupportExt;
import org.springframework.roo.addon.layers.repository.jpa.annotations.RooJpaRepositoryCustomImpl;
import com.foo.domain.Timer;

/**
 * = TimerRepositoryImpl
 *
 * TODO Auto-generated class documentation
 *
 */ 
@RooJpaRepositoryCustomImpl(repository = TimerRepositoryCustom.class)
public class TimerRepositoryImpl extends QueryDslRepositorySupportExt<Timer> {

    /**
     * TODO Auto-generated constructor documentation
     */
    TimerRepositoryImpl() {
        super(Timer.class);
    }
}